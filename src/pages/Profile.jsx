import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getItem } from '../services/LocalStorageFuncs';

function Profile() {
  const { push } = useHistory();
  return (
    <section>
      <Header />
      <p data-testid="profile-email">{getItem('user').email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </section>
  );
}

export default Profile;
