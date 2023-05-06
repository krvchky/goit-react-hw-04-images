import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';


const Searchbar = ({ onSubmit }) => {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleChange = e => {
      setSearchQuery(e.target.value.toLowerCase());
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      if (searchQuery.trim() === '') {
        return alert('Please enter something 😎');
      }
      onSubmit(searchQuery);
      setSearchQuery('');
    };

return (
<header className={css.searchbar}>
    <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type='submit' className={css.SearchFormButton}>
            <span>
                <FiSearch size={25} stroke='#3f51b5'/>
            </span>
        </button>

        <input 
        className={css.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        name="searchQuery"
        value={searchQuery}
        onChange={handleChange}
        />
    </form>
</header>
);
}

Searchbar.propTypes = {
onSubmit: PropTypes.func,
};

export default Searchbar;