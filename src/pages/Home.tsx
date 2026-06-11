/**
 * Home / landing page.
 *
 * Presents the two demos as large, tappable cards. Clicking a card navigates to
 * that feature's dedicated page (`/counter` or `/todos`), where only that
 * feature is shown. The whole card is a router `<Link>`, so it's one big,
 * obvious hit target — good for both mouse and touch.
 */
import { Link } from 'react-router-dom';

interface DemoCard {
  to: string;
  icon: string;
  title: string;
  description: string;
}

const DEMOS: DemoCard[] = [
  {
    to: '/counter',
    icon: '🔢',
    title: 'Counter',
    description: 'The minimal Redux slice — increment, decrement, add an amount, and reset.',
  },
  {
    to: '/todos',
    icon: '✅',
    title: 'Todo List',
    description: 'A richer slice — add, complete, delete, and filter tasks with a derived selector.',
  },
];

export function Home() {
  return (
    <section className="home">
      <div className="home-intro">
        <h1>Choose a demo</h1>
        <p>Two small examples of state management with Redux Toolkit.</p>
      </div>

      <div className="card-grid">
        {DEMOS.map((demo) => (
          <Link key={demo.to} to={demo.to} className="demo-card">
            <span className="demo-card__icon" aria-hidden="true">
              {demo.icon}
            </span>
            <h2 className="demo-card__title">{demo.title}</h2>
            <p className="demo-card__desc">{demo.description}</p>
            <span className="demo-card__cta">
              Open <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
