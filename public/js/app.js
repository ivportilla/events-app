// Feathers client configuration
var app = feathers();
var host = "http://localhost:3030";
var socket = io(host);

app
  .configure(feathers.hooks())
  .configure(feathers.socketio(socket))
  .configure(feathers.authentication({
    storage: window.localStorage
  }));


var userService = app.service("users");
var eventService = app.service("events");

Vue.filter('format', function(val){
  return moment(val).format("MMM Do YYYY");
});

var client = new Vue({
  el: '#app',
  data: {
    user: {
      email: '',
      password: '',
      logged: false
    },
    new: {
      email: '',
      password: '',
      result: ''
    },
    currentEvent: {
      name: '',
      address: '',
      description: '',
      date: Date.now()
    },
    eventList: []

  },
  created() {
    eventService.on('created', message => {
      this.eventList.unshift(message);
    });

    // Try to authenticate if token is saved
    app.authenticate()
      .then( res =>  {
        this.user.logged = true;
        this.getEvents();
        this.user.email = res.data.email;
      })
  },
  methods: {
    login() {
      authenticate(this.user.email, this.user.password)
        .then( res => {
          this.user.logged = true;
          this.getEvents();
        } )
        .catch( err => {
          console.log("Error in login:", err);
        } )
    },

    logout() {
      app.logout()
        .then( () => {
          this.user.logged = false;
          this.user.email = '',
          this.user.password = ''
        } );
    },

    createEvent() {
      eventService.create({
        name: this.currentEvent.name,
        description: this.currentEvent.description,
        address: this.currentEvent.address,
        date: this.currentEvent.date
      })
        .then( res => {
          this.cleanEvent();
        } )
        .catch( err => console.log('Error creating event:', err) )
    },

    getEvents() {
      eventService.find({})
        .then( res => {
          this.eventList = res.data;
        } )
        .catch( err => console.log('Error getting events:', err) );
    },

    cleanEvent() {
      this.currentEvent.name = '',
      this.currentEvent.description = '',
      this.currentEvent.address = '',
      this.currentEvent.date = Date.now()
    },

    register() {
      userService.create({
        email: this.new.email,
        password: this.new.password
      })
        .then( res => {
          this.new.result = 'User created successfully, please login';
        })
        .catch( err => {
          this.new.result = 'Error creating user';
          console.log('Error creating user:', err);
        } );
    }
  }
});

function authenticate(email, pass){
  return app.authenticate({
    type: 'local',
    email: email,
    password: pass
  });
}




