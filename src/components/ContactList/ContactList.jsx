import contactListCSS from './ContactList.module.css';
import propTypes from 'prop-types';

export const ContactList = ({ filterList, onRemoveItem }) => {
  return (
    <ul className={contactListCSS.contact_list}>
      {filterList.map(({ id, name, number }) => (
        <li key={id} className={contactListCSS.contact_item}>
          <div className={contactListCSS.contact_text_wrap}>
            <p className={contactListCSS.contact_name}>{name}</p>
            <p className={contactListCSS.contact_number}>{number}</p>
          </div>
          <button
            className={contactListCSS.contact_delete_btn}
            onClick={() => onRemoveItem(id)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  filterList: propTypes.arrayOf(propTypes.shape).isRequired,
  onRemoveItem: propTypes.func.isRequired,
};
