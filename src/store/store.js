
export default class Store {

  contacts = {}

  constructor() {
    // load all the contacts
    if (!window.localStorage.hasOwnProperty('_pcrm_contacts')) {
      // save overwrites
      this.save_contacts()
    }
    this.load_contacts()
  }

  update_contact(rest, id) {
    // using number ids for now, swap to uuid ASAP
    // if no ID, create one
    if (isNaN(id)) {
      id = this.get_new_id()
      rest.id = id
    }
    this.contacts[id] = rest // TODO rest should be a Contact class
    this.save_contacts()
  }

  save_contacts() {
    window.localStorage.setItem('_pcrm_contacts', JSON.stringify(this.contacts))
  }
  load_contacts() {
    this.contacts = JSON.parse(window.localStorage._pcrm_contacts)
  }

  reset() {
    console.log('here')
    window.localStorage.setItem('_pcrm_contacts', "{}")
    this.load_contacts()
  }

  get_new_id() {
    //TODO switch to UUID
    const largest_id = Math.max(Object.values(this.contacts).map(o => parseInt(o.id)))
    return largest_id + 1
  }
}

// TODO create contact class that saves itself to local storage on create and updates storage after any property access
