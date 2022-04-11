export const validateRequired = (message = '必填值不能为空', trigger = 'ononBlur') => ({
  required: true,
  message,
  trigger
})

export const validatePhone = {
  pattern: /^1\d{10}$/,
  message: '请输入正确的手机号码',
  trigger: 'onBlur'
}
