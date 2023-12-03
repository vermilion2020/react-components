import { IFormData } from "../../model/state.interface";

interface IFormTileProps {
  formData: IFormData,
  active: boolean
}

function FormTile({ formData, active }: IFormTileProps) {
  return (
    <section className={ active ? 'active form-tile' : 'form-tile' }>
      <div className="img-container">
        <img src={formData.image} alt={`${formData.name} image`} className="form-image" loading="lazy" />
      </div>
      <div className="data-container">
        <div className="data-row">Name:{formData.name}</div>
        <div className="data-row">Age:{formData.name}</div>
        <div className="data-row">Email:{formData.name}</div>
        <div className="data-row">Password:{formData.name}</div>
        <div className="data-row">Confirm password:{formData.name}</div>
        <div className="data-row">Terms and conditions: {formData.tnc ? 'accepted' : 'not accepted'}</div>
        <div className="data-row">Gender:{formData.gender}</div>
        <div className="data-row">Country:{formData.country}</div>
      </div>
    </section>
  );
  
}

export default FormTile;