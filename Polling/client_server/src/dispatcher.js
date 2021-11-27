export const server_dispatch = action => {
  switch (action.type) {
    case 'concede': {
      return { ...action }
    }
    case 'polling': {
      return { action }
    }

    case 'severityLevel': {
      return { action }
    }

    case 'subscribe': {
      return "subscribe"
    }

    case 'unsubscribe': {
      return "unsubscribe"
    }

    default:
      return action
  }
}

export const create_action = server_msg => {
  return { type: 'polling', server_msg }
}