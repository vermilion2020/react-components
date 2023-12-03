import { IFormData } from "../../model/state.interface";
import { useAppSelector } from "../../redux";

interface IFormTileProps {
  formData: IFormData,
  active: boolean
}

function FormTile({ formData, active }: IFormTileProps) {
  const { countries } = useAppSelector(
    (state) => state.appState
  );
  return (
    <section className={ active ? 'active form-tile' : 'form-tile' }>
      <div className="img-container">
        <img src={formData.image} alt={`${formData.name} image`} className="form-image" loading="lazy" />
      </div>
      <div className="data-container">
        <div className="data-row"><span className="sup-info">Name:</span> {formData.name}</div>
        <div className="data-row"><span className="sup-info">Age:</span> {formData.age}</div>
        <div className="data-row"><span className="sup-info">Email:</span> {formData.email}</div>
        <div className="data-row"><span className="sup-info">Password:</span> {formData.password}</div>
        <div className="data-row"><span className="sup-info">Confirm password:</span> {formData.confirmPassword}</div>
        <div className="data-row"><span className="sup-info">Terms and conditions:</span> {formData.tnc ? 'accepted' : 'not accepted'}</div>
        <div className="data-row"><span className="sup-info">Gender:</span> {formData.gender}</div>
        <div className="data-row"><span className="sup-info">Country:</span> {countries[countries.findIndex(c => c.code === formData.country)].name}</div>
      </div>
    </section>
  );
  
}

export default FormTile;