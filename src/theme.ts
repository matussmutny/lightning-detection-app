import { extendTheme } from '@chakra-ui/react'
import { BG_COLOR } from './constants'

const styles = {
  global: {
    // styles for the `body`
    body: {
      bg: BG_COLOR,
      color: '#eee',
      'overscroll-behavior-y': 'contain'
    },
    // styles for the `a`
    button: {
      background: 'none',
      _disabled: {
        background: 'none'
      }
    },
    icon: {
      background: 'none'
    }
  }
}

const theme = extendTheme({
  styles,
  components: {
    IconButton: {
      baseStyle: {
        background: 'none',
        color: 'green'
      },
      _disabled: {
        background: 'none'
      },
      _active: {
        background: 'none'
      }
    },
    Button: {
      baseStyle: {
        borderRadius: 'full',
        background: 'none',
        _focus: { boxShadow: 'none' },
        _active: {
          background: 'none'
        },
        _hover: {
          background: 'none'
        }
      },
      _hover: {
        background: 'none'
      },
      _active: {
        background: 'none'
      }
    }
  }
})

export default theme
