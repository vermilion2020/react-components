import * as yup from "yup";

export const schema1 = yup
  .object()
  .shape({
    name: yup.string().required().test({
      name: 'name',
      skipAbsent: true,
      test(value, ctx) {
        if (!value.startsWith(value.slice(0,1).toUpperCase())) {
          return ctx.createError({ message: 'The first letter should be in uppercase' })
        }
        return true
      }
    }),
    age: yup.string().required().test({
      name: 'age',
      skipAbsent: true,
      test(value, ctx) {
        if (parseInt(value) <= 0) {
          return ctx.createError({ message: 'Age should be greater than zero' })
        }
        return true
      }
    })
  })
  .required()