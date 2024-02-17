import './CustomSpinner.css';

export const CustomSpinner = () => {
  return (
    <div className="custom-spinner">
      <div
        className="edit-spinner spinner-border"
        role="status"
      ></div>
      <span className="edit-spinner-span">Cargando datos</span>
    </div>
  );
}