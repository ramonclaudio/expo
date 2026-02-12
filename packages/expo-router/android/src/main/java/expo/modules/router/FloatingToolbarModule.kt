package expo.modules.router

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class FloatingToolbarModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoFloatingToolbarModule")

    View(FloatingToolbarContainerView::class) {
      Prop("variant") { view: FloatingToolbarContainerView, variant: String? ->
        view.setVariant(variant ?: "standard")
      }
      Prop("backgroundTint") { view: FloatingToolbarContainerView, color: Int? ->
        view.setBackgroundTint(color)
      }
      Prop("elevation") { view: FloatingToolbarContainerView, elevation: Float? ->
        view.setToolbarElevation(elevation)
      }
      Prop("shapeAppearance") { view: FloatingToolbarContainerView, borderRadius: Float? ->
        view.setCornerRadius(borderRadius ?: 28f)
      }
      Prop("hidden") { view: FloatingToolbarContainerView, hidden: Boolean? ->
        view.setHidden(hidden ?: false)
      }
      Prop("alignment") { view: FloatingToolbarContainerView, alignment: String? ->
        view.setAlignment(alignment ?: "center")
      }
    }

    View(FloatingToolbarItemView::class) {
      Prop("title") { view: FloatingToolbarItemView, title: String? ->
        view.setTitle(title)
      }
      Prop("iconDrawable") { view: FloatingToolbarItemView, name: String? ->
        view.setIconDrawable(name)
      }
      Prop("iconSrc") { view: FloatingToolbarItemView, src: Int? ->
        view.setIconSrc(src)
      }
      Prop("disabled") { view: FloatingToolbarItemView, disabled: Boolean? ->
        view.setDisabled(disabled ?: false)
      }
      Prop("tintColor") { view: FloatingToolbarItemView, color: Int? ->
        view.setTintColor(color)
      }
      Prop("isSpacer") { view: FloatingToolbarItemView, isSpacer: Boolean? ->
        view.setIsSpacer(isSpacer ?: false)
      }
      Prop("spacerWidth") { view: FloatingToolbarItemView, width: Float? ->
        view.setSpacerWidth(width)
      }

      Events("onSelected")
    }
  }
}
