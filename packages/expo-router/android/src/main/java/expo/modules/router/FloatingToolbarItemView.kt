package expo.modules.router

import android.content.Context
import android.content.res.ColorStateList
import android.view.View
import android.view.ViewGroup
import com.google.android.material.button.MaterialButton
import com.google.android.material.R as MaterialR
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView

class FloatingToolbarItemView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {

  private val themedContext = androidx.appcompat.view.ContextThemeWrapper(
    context,
    com.google.android.material.R.style.Theme_Material3_Light
  )

  private var isSpacer = false
  private var spacerWidth: Float? = null

  private val button = MaterialButton(themedContext, null, MaterialR.attr.materialIconButtonStyle).apply {
    layoutParams = ViewGroup.LayoutParams(
      ViewGroup.LayoutParams.WRAP_CONTENT,
      ViewGroup.LayoutParams.WRAP_CONTENT
    )
  }

  private val spacerView = View(context)

  fun getMaterialButton(): View {
    return if (isSpacer) {
      val width = spacerWidth?.let { (it * resources.displayMetrics.density).toInt() }
        ?: 0
      spacerView.layoutParams = ViewGroup.LayoutParams(
        if (width > 0) width else ViewGroup.LayoutParams.WRAP_CONTENT,
        ViewGroup.LayoutParams.MATCH_PARENT
      )
      spacerView
    } else {
      button
    }
  }

  fun setTitle(title: String?) {
    button.text = title
  }

  fun setIconDrawable(name: String?) {
    if (name == null) {
      button.icon = null
      return
    }
    val resId = context.resources.getIdentifier(name, "drawable", context.packageName)
    if (resId != 0) {
      button.setIconResource(resId)
    }
  }

  fun setIconSrc(src: Int?) {
    // Reserved for future image source support via shared object IDs.
  }

  fun setDisabled(disabled: Boolean) {
    button.isEnabled = !disabled
  }

  fun setTintColor(color: Int?) {
    if (color != null) {
      button.iconTint = ColorStateList.valueOf(color)
    } else {
      button.iconTint = null
    }
  }

  fun setIsSpacer(isSpacer: Boolean) {
    this.isSpacer = isSpacer
  }

  fun setSpacerWidth(width: Float?) {
    this.spacerWidth = width
  }

  fun setOnSelected(callback: (() -> Unit)?) {
    button.setOnClickListener {
      callback?.invoke()
    }
  }
}
