import { useState } from 'react';

function App() {
  // Portfolio data
  const name = "Your Name"; // Replace with your actual name
  const bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."; // Replace with your actual bio

  // Newsletter form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: {
      webDev: false,
      design: false,
      dataScience: false
    }
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Helper function to get selected interests
  const getSelectedInterests = () => {
    const selected = [];
    if (formData.interests.webDev) selected.push('Web Development');
    if (formData.interests.design) selected.push('Design');
    if (formData.interests.dataScience) selected.push('Data Science');
    return selected.join(', ');
  };

  return (
    <div>
      {/* Portfolio Section */}
      <header>
        <h1>Hi, I'm {name}</h1>
        <img 
          src="https://via.placeholder.com/350" 
          alt="My profile pic" 
        />
      </header>

      <section>
        <h2>About Me</h2>
        <p>{bio}</p>
        <div>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </section>

      {/* Newsletter Form Section */}
      <section>
        <h2>Newsletter Signup</h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <fieldset>
              <legend>Interests:</legend>
              <div>
                <input
                  type="checkbox"
                  id="webDev"
                  name="webDev"
                  checked={formData.interests.webDev}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="webDev">Web Development</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="design"
                  name="design"
                  checked={formData.interests.design}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="design">Design</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="dataScience"
                  name="dataScience"
                  checked={formData.interests.dataScience}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="dataScience">Data Science</label>
              </div>
            </fieldset>

            <button type="submit">Submit</button>
          </form>
        ) : (
          <div>
            <h3>Thank you for subscribing, {formData.name}!</h3>
            <p>
              We'll send updates about {getSelectedInterests() || 'your selected interests'} to {formData.email}.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;