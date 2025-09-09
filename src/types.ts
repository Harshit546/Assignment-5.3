export interface Address {
  street:  string
  suite:   string
  city:    string
  zipcode: string
}

export interface Company {
  name:        string
}

export interface RawUser {
  id:       number
  username: string
  name:     string
  email:    string
  address:  Address
  phone:    string
  website:  string
  company:  Company
}

export interface User extends RawUser {
  liked: boolean
}
