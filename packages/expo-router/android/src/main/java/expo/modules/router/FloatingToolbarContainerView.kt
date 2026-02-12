package expo.modules.router

import android.content.Context
import android.content.res.ColorStateList
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.LinearLayout
import androidx.appcompat.view.ContextThemeWrapper
import com.google.android.material.color.MaterialColors
import com.google.android.material.floatingtoolbar.FloatingToolbarLayout
import com.google.android.material.shape.MaterialShapeDrawable
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView

class FloatingToolbarContainerView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {

  override val shouldUseAndroidLayout: Boolean = true

  private val themedContext = ContextThemeWrapper(context, com.google.android.material.R.style.Theme_Material3_Light)

  // contentLayout is a child of FloatingToolbarLayout (which extends FrameLayout),
  // so it uses FrameLayout.LayoutParams with center gravity.
  private val contentLayout = LinearLayout(themedContext).apply {
    orientation = LinearLayout.HORIZONTAL
    layoutParams = FrameLayout.LayoutParams(
      FrameLayout.LayoutParams.WRAP_CONTENT,
      FrameLayout.LayoutParams.WRAP_CONTENT,
      Gravity.CENTER
    )
  }

  // toolbar is a child of ExpoView (which extends LinearLayout),
  // so it uses LinearLayout.LayoutParams. It fills the parent so the
  // FloatingToolbarLayout background covers the ExpoView area.
  private val toolbar = FloatingToolbarLayout(themedContext).apply {
    layoutParams = LinearLayout.LayoutParams(
      LinearLayout.LayoutParams.MATCH_PARENT,
      LinearLayout.LayoutParams.MATCH_PARENT
    )
    addView(contentLayout)
  }

  private var currentVariant: String = "standard"
  private var hasCustomBackgroundTint = false
  private val itemViews = mutableListOf<FloatingToolbarItemView>()

  init {
    gravity = Gravity.CENTER
    super.addView(toolbar)
  }

  override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
    // Yoga sets our bounds but doesn't trigger Android's internal measure/layout for children.
    // Manually measure and layout the toolbar to fill the ExpoView.
    val w = r - l
    val h = b - t
    if (w > 0 && h > 0) {
      toolbar.measure(
        MeasureSpec.makeMeasureSpec(w, MeasureSpec.EXACTLY),
        MeasureSpec.makeMeasureSpec(h, MeasureSpec.EXACTLY)
      )
      toolbar.layout(0, 0, w, h)
    }
  }

  fun setAlignment(alignment: String) {
    val contentGravity = when (alignment) {
      "left" -> Gravity.START or Gravity.CENTER_VERTICAL
      "right" -> Gravity.END or Gravity.CENTER_VERTICAL
      else -> Gravity.CENTER
    }
    val params = contentLayout.layoutParams
    if (params is FrameLayout.LayoutParams) {
      params.gravity = contentGravity
      contentLayout.layoutParams = params
    }
  }

  fun setVariant(variant: String) {
    currentVariant = variant
    if (!hasCustomBackgroundTint) {
      applyVariantColor()
    }
  }

  fun setBackgroundTint(color: Int?) {
    hasCustomBackgroundTint = color != null
    if (color != null) {
      toolbar.backgroundTintList = ColorStateList.valueOf(color)
    } else {
      applyVariantColor()
    }
  }

  private fun applyVariantColor() {
    if (currentVariant == "vibrant") {
      val wrappedContext = ContextThemeWrapper(
        context,
        com.google.android.material.R.style.Theme_Material3_DynamicColors_Light
      )
      val color = MaterialColors.getColorOrNull(
        wrappedContext,
        com.google.android.material.R.attr.colorPrimaryContainer
      )
      if (color != null) {
        toolbar.backgroundTintList = ColorStateList.valueOf(color)
      }
    } else {
      toolbar.backgroundTintList = null
    }
  }

  fun setToolbarElevation(elevation: Float?) {
    if (elevation != null) {
      toolbar.elevation = elevation * resources.displayMetrics.density
    }
  }

  fun setCornerRadius(radius: Float) {
    val background = toolbar.background
    if (background is MaterialShapeDrawable) {
      background.shapeAppearanceModel = background.shapeAppearanceModel.toBuilder()
        .setAllCornerSizes(radius * resources.displayMetrics.density)
        .build()
    }
  }

  fun setHidden(hidden: Boolean) {
    toolbar.visibility = if (hidden) View.GONE else View.VISIBLE
  }

  override fun addView(child: View?, index: Int, params: ViewGroup.LayoutParams?) {
    if (child is FloatingToolbarItemView) {
      itemViews.add(child)
      // Defer adding the MaterialButton until the next frame to ensure all props
      // (such as isSpacer) are set before getMaterialButton() is called.
      post {
        contentLayout.addView(child.getMaterialButton())
      }
    } else {
      super.addView(child, index, params)
    }
  }

  override fun removeView(child: View?) {
    if (child is FloatingToolbarItemView) {
      itemViews.remove(child)
      val button = child.getMaterialButton()
      contentLayout.removeView(button)
    } else {
      super.removeView(child)
    }
  }

  override fun removeViewAt(index: Int) {
    if (index < itemViews.size) {
      val child = itemViews.removeAt(index)
      val button = child.getMaterialButton()
      contentLayout.removeView(button)
    } else {
      super.removeViewAt(index)
    }
  }

  override fun removeAllViews() {
    for (child in itemViews) {
      val button = child.getMaterialButton()
      contentLayout.removeView(button)
    }
    itemViews.clear()
  }
}
