# Services

* Contains all business logic.
* Does not "know" anything about the data layer -- simply calls functions provided by the `models` interface.
  * never imports DB dependencies
  * shouldn't know what the columns in a DB are named to do their job
* Does not "know" anything about the format of user requests/responses.
  * never takes raw request objects as parameters
  * never returns HTTP status codes or the like
* Exports function to be used by the `routes` layer.
* Each database table (ie each "Object" abstraction) has its own file.
