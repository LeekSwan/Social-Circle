# Routes

Routes -> Services -> Models -> DB

* Connects user requests to services.
* Defines external contract/interface (eg parameters, status codes, etc) with internal services.
* Can provide validation, but does not contain business logic.

* Does not "know" anything about the service or data layer -- simply calls functions provided by the `services` interface.
  * never imports DB dependencies
  * shouldn't know what the columns in a DB are named to do their job
