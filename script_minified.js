import { useLayoutEffect, useState } from 'react'

import { createStyles, makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux'

import getIsInNestedIframe from '@/models/internalRouter/selectors/getIsInNestedIframe'
import iframeProvider from '@/services/$iframe-provider'

const useStyles = ({
  viewportHeight,
  scrollPosY,
}: {
  viewportHeight: number
  scrollPosY: number
}) => {
  return makeStyles(() =>
    createStyles({
      root: {
        zIndex: 999999,
        maxHeight: viewportHeight,
        height: viewportHeight,
        position: 'fixed !important' as 'fixed',
        top: scrollPosY,
      },
    })
  )
}

export const useEmbedDialogStyles = (isEmbed: boolean, isVisible: boolean) => {
  const [layoutParams, setLayoutParams] = useState<{ viewportHeight: number; scrollPosY: number }>({
    viewportHeight: 0,
    scrollPosY: 0,
  })
  const isInNestedIframe = useSelector(getIsInNestedIframe)

  const styles = useStyles(layoutParams)()

  useLayoutEffect(() => {
    if (isEmbed) {
      iframeProvider.blockScrollWhenDialogVisible(isVisible)
      iframeProvider.getIframeParentViewportHeightAndScrollPosY(setLayoutParams)
      if (isVisible && isInNestedIframe) {
        document.body.style.height = layoutParams.viewportHeight + 'px'
        // TODO: temp solution only for winiary, remove when fixed
      } else {
        document.body.style.height = 'unset'
      }
    }

    return () => window.removeEventListener('message', () => {})
  }, [isVisible])

  return {
    embedDialogStyles: isEmbed ? styles : undefined,
  }
}
