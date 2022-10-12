import axios from "axios";

export default {
  async function getTracks() {
    try {
      const response = await axios.get('http://localhost:3000/users');
        return tracks;
    } catch (error) {
        console.error(error);
    }
  }
}
