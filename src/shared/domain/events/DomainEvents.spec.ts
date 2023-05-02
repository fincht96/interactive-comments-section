import { AggregateRoot } from '../AggregateRoot';
import { UniqueEntityId } from '../UniqueEntityId';
import { DomainEvents } from './DomainEvents';
import { IDomainEvent } from './IDomainEvent';

interface ExampleProps {
  name: string;
}

class TestAggregateRoot extends AggregateRoot<ExampleProps> {
  public addDomainEvent(domainEvent: IDomainEvent): void {
    super.addDomainEvent(domainEvent);
  }
}

class ExampleDomainEvent implements IDomainEvent {
  dateTimeOccurred: Date;
  constructor() {
    this.dateTimeOccurred = new Date(2012, 0, 1);
  }
  getAggregateId() {
    return new UniqueEntityId('1');
  }
}

describe('DomainEvents', () => {
  let testAggRootObj: TestAggregateRoot | undefined = undefined;
  beforeEach(() => {
    DomainEvents.clearHandlers();
    DomainEvents.clearMarkedAggregates();
  });

  test('should call handler associated with domain event', (done) => {
    testAggRootObj = new TestAggregateRoot(
      { name: 'Jeff' },
      new UniqueEntityId(1001)
    );

    // register event handler for event of name ExampleDomainEvent
    DomainEvents.register((event) => {
      try {
        const eventId = event.getAggregateId();
        expect(eventId.equals(new UniqueEntityId('1'))).toBe(true);
        done();
      } catch (error) {
        done(error);
      }
    }, 'ExampleDomainEvent');

    // add domain event to test aggregate root object
    testAggRootObj?.addDomainEvent(new ExampleDomainEvent());

    // execute events associated with testAggRootObj
    DomainEvents.dispatchEventsForAggregate(new UniqueEntityId(1001));
  });
});
