import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user'));
  console.log(userEmail);
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div>
      <section>
        <Header title="Profile" />
        <Footer />
      </section>
      <div>
        <h2 data-testid="profile-email">
          User :
          {userEmail !== null ? userEmail.email : 'User'}
        </h2>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
