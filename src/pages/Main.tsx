import { useSearchParams } from "react-router-dom";
import FormTile from "../components/form-tile/FormTile";
import { useAppSelector } from "../redux";

function MainPage() {
  const { forms } = useAppSelector(
    (state) => state.appState
  );
  const [searchParams] = useSearchParams();
  const activeFormId = searchParams.get('active') ?? '';
  return (
    <div className="content">
      <h1>Main</h1>
      {
        forms.length ?
          forms.map(form => <FormTile formData={form} key={form.id} active={!!activeFormId && +activeFormId === form.id}/>) :
          <h3>Form data is not yet added</h3>
      }
    </div>
  );
}

export default MainPage;
