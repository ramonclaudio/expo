package expo.modules.video.records

import androidx.media3.common.util.UnstableApi
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import java.io.Serializable

@UnstableApi
class PlayerBuilderOptions(
  @Field var seekBackwardIncrement: Double? = null,
  @Field var seekForwardIncrement: Double? = null
) : Record, Serializable
