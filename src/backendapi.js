import Axios from 'axios'
const host = {
    heroku: "//pldds-beta.herokuapp.com",
    localhost: "//192.168.43.59:5000"
}
export default Axios.create({
    baseURL:host.heroku
})
