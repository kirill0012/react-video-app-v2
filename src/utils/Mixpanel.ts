import mixpanel, { Dict } from 'mixpanel-browser'
mixpanel.init('93f01023683de4af827721c7a2ef521a')

const env_check = true

const actions = {
  identify: (id?: string | undefined) => {
    if (env_check) mixpanel.identify(id)
  },
  alias: (id: string) => {
    if (env_check) mixpanel.alias(id)
  },
  track: (name: string, props?: Dict | undefined) => {
    if (env_check) mixpanel.track(name, props)
  },
  people: {
    set: (props: Dict) => {
      if (env_check) mixpanel.people.set(props)
    },
  },
}

export const Mixpanel = actions
