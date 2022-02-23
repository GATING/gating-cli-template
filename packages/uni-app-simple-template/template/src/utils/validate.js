export const validateRequired = (message, trigger = 'blur') => ({
  required: true,
  message,
  trigger
})

export const validatePhone = () => ({
  pattern: /^1[3456789]\d{9}$/,
  message: '请输入正确的手机号',
  // 正则检验前先将值转为字符串
  transform: value => value + '',
  trigger: 'blur'
})

export const validatePassword = () => ({
  pattern: /^(?![a-zA-Z]+$)(?![0-9]+$)[0-9a-zA-Z~!@#$%^&*_.+`\-={}:";'<>?,/]{8,16}$/,
  // 正则检验前先将值转为字符串
  transform: value => value + '',
  message: '密码需满足8-16位，包含数字,字母',
  trigger: 'blur'
})
