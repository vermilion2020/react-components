import { AppDispatch, useAppSelector } from '../../redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from '../../model/validation-types';
import { schema } from '../../model/schema';
import { useDispatch } from 'react-redux';
import { addForm } from '../../redux/features/appSlice';
import { useNavigate } from "react-router-dom";

function Uncontrolled() {
  const { countries } = useAppSelector(
    (state) => state.appState
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmitHandler = async (data: Inputs) => {
    const file = data.image[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = reader.result as string;
          const newData = { ...data, image: img, id: new Date().getTime() };
          dispatch(addForm(newData));
          console.log(newData);
          navigate(`/?active=${newData.id}`);
      };
      reader.readAsDataURL(file);
    reset();
  };

  const { register, handleSubmit,  formState: { errors }, reset } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Some amazing form</h2>
    <div className="input-container">
      <input type="text" {...register("name")} placeholder="Name" title="Fill the name starting from the capital letter" />
      <p className="error-message">{errors.name?.message}</p>
    </div>
    <div className="input-container">
      <input type="text" {...register("age")} placeholder="Age" title="Fill the age more than 0" />
      <p className="error-message">{errors.age?.message}</p>
    </div>
    <div className="input-container">
      <input {...register("email")} placeholder="Email" type="text" title="Fill the valid email" />
      <p className="error-message">{errors.email?.message}</p>
    </div>
    <div className="input-container">
      <input type="password" {...register("password")} placeholder="Password" title="Fill the valid password" />
      <p className="error-message">{errors.password?.message}</p>
    </div>
    <div className="input-container">
      <input type="password" {...register("confirmPassword")} placeholder="Password confirmation" title="Confirm the password" />
      <p className="error-message">{errors.confirmPassword?.message}</p>
    </div>
    <div className="input-container">
      <select {...register("gender")} title="Select the gender" >
        <option value="">Select the gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    <p className="error-message">{errors.gender?.message}</p>
    </div>
    <div className="input-container checkbox" title="Accept terms and conditions">
      <label htmlFor="tnc" className="tnc-container">
        <input type="checkbox" {...register("tnc")} id="tnc" />
          accept T&C
      </label>
      <p className="error-message">{errors.tnc?.message}</p>
    </div>
    <div className="input-container file">
      <input type="file" {...register("image")} />
      <p className="error-message">{errors.image?.message}</p>
    </div>
    <div className="input-container">
      <select {...register("country")} >
        <option value="">Select the country</option>
        {
          countries.map(country => <option value={country.code} key={country.code}>{country.name}</option>)
        }
      </select>
      <p className="error-message">{errors.country?.message}</p>
    </div>
    <button className="button" type="submit">Save</button>
    <br />
  </form>
  );
}

export default Uncontrolled;
