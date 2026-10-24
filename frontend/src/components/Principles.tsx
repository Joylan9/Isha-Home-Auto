import { principles } from '../data/content';
import { Icon } from './Icon';

export function Principles() {
  return (
    <section className="principles section" aria-label="Our principles">
      <div className="container principles__grid">
        {principles.map((p) => (
          <div className="principle" data-reveal key={p.title}>
            <span className="principle__icon">
              <Icon name={p.icon} />
            </span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
