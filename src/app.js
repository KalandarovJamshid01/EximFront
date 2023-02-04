import * as React from 'react';
import { root as RouterRoot } from './routes/root';
/**
 * Currently I work as working with a static pages.
 * We will connect it to soon!
 * - import classes from './view.app.scss';
 *   <div className={classes.australia}>Stand with Australia</div>
 */
import './styles/main.scss';

export default function App() {
  return <RouterRoot/>;
}