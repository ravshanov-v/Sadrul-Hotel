const EMAIL_CONFIG = {
  SERVICE_ID: "service_57yo08e",
  TEMPLATE_ID: "template_qfuw8wj",
  PUBLIC_KEY: "B_6-84lBa41XJSe_B",
  FROM_NAME: "Sadrul Hotel",
  FROM_EMAIL: "noreply@sadrul.uz"
}

export default EMAIL_CONFIG

export function isEmailConfigured() {
  return !!(EMAIL_CONFIG.SERVICE_ID && EMAIL_CONFIG.TEMPLATE_ID && EMAIL_CONFIG.PUBLIC_KEY)
}
