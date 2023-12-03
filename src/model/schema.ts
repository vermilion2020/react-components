import * as yup from "yup";

const EMAIL_REGEXP = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;

export const schema = yup
  .object()
  .shape({
    name: yup.string().required().test({
      name: 'is-name',
      skipAbsent: true,
      test(value, ctx) {
        if (!value.startsWith(value.slice(0,1).toUpperCase())) {
          return ctx.createError({ message: 'The first letter should be in uppercase' })
        }
        return true
      }
    }),
    age: yup.number().required().min(0),
    email: yup.string().required().test({
      name: 'is-email',
      skipAbsent: true,
      test(value, ctx) {
        if (!EMAIL_REGEXP.test(value)) {
          return ctx.createError({ message: 'Email value is incorrect: should include @ and . as separators' })
        }
        return true
      }
    }),
    password: yup.string().required().test({
      name: 'is-email',
      skipAbsent: true,
      test(value, ctx) {
        if (!/[a-z]+/.test(value)) {
          return ctx.createError({ message: 'Password should contain one character in lower case' })
        }
        if (!/[A-Z]+/.test(value)) {
          return ctx.createError({ message: 'Password should contain one character in upper case' })
        }
        if (!/[0-9]+/.test(value)) {
          return ctx.createError({ message: 'Password should contain one numeric character' })
        }
        if (!/[^A-Za-z0-9]/.test(value)) {
          return ctx.createError({ message: 'Password should contain one special character' })
        }
        return true
      }
    }),
    confirmPassword: yup.string().defined().oneOf([yup.ref('password')], 'Passwords must match'),
    gender: yup.string().required(),
    image: yup.mixed<Blob[]>().required().test((value, ctx) => {
      const val = value[0];
      if (!val) {
        return ctx.createError({ message: 'The image is required' })
      }
      if (val.size >= 1000000) {
        return ctx.createError({ message: 'The image is too large, should be less than 1mb' })
      }
      if (val.type !== 'image/png' && val.type !== 'image/jpeg') {
        return ctx.createError({ message: 'The image type should be jpg or png' })
      }
      return true
    }),
    tnc: yup.boolean().defined().test({
      name: 'is-tnc',
      skipAbsent: true,
      test(value, ctx) {
        if (!value) {
          return ctx.createError({ message: 'Terms and condition should be accepted before proceed' })
        }
        return true
      }
    }),
    country: yup.string().required(),
  })
  .required()