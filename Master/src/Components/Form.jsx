function Form() {
    return (
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
  
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
  
        <button type="submit">Submit</button>
      </form>
    );
  }