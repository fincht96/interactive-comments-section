import { Entity } from './Entity';
import { IDomainEvent } from './events/IDomainEvent';
import { DomainEvents } from './events/DomainEvents';
import { UniqueEntityId } from './UniqueEntityId';

/**
 * @desc An aggregateRoot is the root object that is composed of multiple entities
 */

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get id(): UniqueEntityId {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    // Add the domain event to this aggregate's list of domain events
    this._domainEvents.push(domainEvent);
    // Add this aggregate instance to the DomainEvent's list of aggregates who's
    // events it eventually needs to dispatch.
    DomainEvents.markAggregateForDispatch(this);
    // Log the domain event to console
    this.logDomainEventAdded(domainEvent);
  }

  /**
   * @method clearEvents
   * @static
   * @desc Called by DomainEvents object after all the domain events of this aggregate root have been dispatched
   */
  public clearEvents(): void {
    // remove all the events from this AggregateRoot
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Object.getPrototypeOf(this);
    const domainEventClass = Object.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      '==>',
      domainEventClass.constructor.name
    );
  }
}
