
# Types of tests

There's a few different types of tests

* manual tests = human interaction
(e2e)

- at first easy
- add more tests -- takes more time

* unit
- smallest testable component (eg a function)
- mock dependencies (assuming that it does what I expect)
- happy + sad path testing



* functional
* integration
- test components working with each other
- test a single service in isolation
- tests dependencies (check that it does what I expect)


* end-to-end tests
- runs everything for real
- very heavy duty / slow, often used as smoke test



* (often used as a smoke tests)
- checks if anything is on fire
- doesn't check for the vast majority of business logic, just the core
