import React from "react";
import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet,
    };
  }

  onInputChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;
      case "pet-name":
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  };

  onProfileSave = (data) => {
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authentication: window.sessionStorage.getItem("SmartBrainToken"),
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          if (
            (response === "success" && response.status(200)) ||
            response.status(304)
          ) {
            this.props.toggleModal();
            this.props.loadUser({ ...this.props.user, ...data });
          } else {
            alert("Something went wrong.. please try again later.");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { user, toggleModal } = this.props;
    const { name, age, pet } = this.state;

    return (
      <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="dib h3 w3"
              alt="avatar"
            />
            <h1>{this.state.name || user.name}</h1>
            <h4>{`Image submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(
              user.joined
            ).toLocaleDateString()}`}</p>
            <hr />

            <label className="mt2 fw6" htmlFor="user-name">
              Name:
            </label>
            <input
              className="pa2 ba w-100"
              placeholder={user.name}
              type="text"
              name="user-name"
              id="name"
              onChange={this.onInputChange}
            />
            <label className="mt2 fw6" htmlFor="user-age">
              Age:
            </label>
            <input
              className="pa2 ba w-100"
              placeholder={user.age || "immortal!"}
              type="text"
              name="user-age"
              id="age"
              onChange={this.onInputChange}
            />
            <label className="mt2 fw6" htmlFor="pet-name">
              Pet:
            </label>
            <input
              className="pa2 ba w-100"
              placeholder={user.pet}
              type="text"
              name="pet-name"
              id="pet"
              onChange={this.onInputChange}
            />

            <div
              className="mt4"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <button
                onClick={() => this.onProfileSave({ name, age, pet })}
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </main>
          <div onClick={toggleModal} className="modal-close">
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
