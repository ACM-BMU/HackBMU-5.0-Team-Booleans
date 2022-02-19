import { Store  } from 'react-notifications-component'
import {notificationSettings} from './settings'
import NotificationElement from './NotificationElement'

export const SetSuccessNotification = (body, hex) => {
    Store.addNotification({
        ...notificationSettings,
       // message: text,
       content:(<NotificationElement body = {body} hex = {hex}/>),
        onRemoval: (id, removedBy) => {
              Store.removeNotification(id)
          },
      })
}
export const SetWarningNotification = () => {
    Store.addNotification({
        ...notificationSettings,
        type:'danger',
       // message: text,
        //content:<NotificationItem text={text}/>,
        // onRemoval: (id, removedBy) => {
        //     //Store.removeNotification(id)
        //   },
      })
}
export const getTooltipSettings = (text) => {
  return {
     "data-tooltip" : text,
     "data-tooltip-conf" : "right delay NoArrow"
   }
 }