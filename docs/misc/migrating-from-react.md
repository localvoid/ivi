# Migrating From React

This document shows how to rewrite examples from the https://react.dev/learn/
documentation with ivi API.

## Table of Contents

- [Describing the UI](#describing-the-ui)
  - [Your first component](#your-first-component)
  - [Importing and exporting component](#importing-and-exporting-components)
  - [Writing markup with JSX](#writing-markup-with-jsx)
  - [Javascript in JSX with curly braces](#javascript-in-jsx-with-curly-braces)
  - [Passing props to components](#passing-props-to-a-component)
  - [Conditional rendering](#conditional-rendering)
  - [Rendering lists](#rendering-lists)
  - [Keeping components pure](#keeping-components-pure)
- [Adding interactivity](#adding-interactivity)
  - [Responding to events](#responding-to-events)
  - [State: a component's memory](#state-a-components-memory)
  - [Updating objects in state](#updating-objects-in-state)
- [Managing state](#managing-state)
  - [Reacting to input with state](#reacting-to-input-with-state)
  - [Choosing the state structure](#choosing-the-state-structure)
  - [Preserving and resetting state](#preserving-and-resetting-state)
  - [Extracting state logic into a reducer](#extracting-state-logic-into-a-reducer)
  - [Passing data deeply with context](#passing-data-deeply-with-context)
- [Escape hatches](#escape-hatches)
  - [Referencing values with refs](#referencing-values-with-refs)
  - [Manipulating the DOM with refs](#manipulating-the-dom-with-refs)
  - [Synchronizing with Effects](#synchronizing-with-effects)
  - [Removing Effect dependencies](#removing-effect-dependencies)
  - [Reusing logic with custom hooks](#reusing-logic-with-custom-hooks)

## [Describing the UI](https://react.dev/learn/describing-the-ui)

### [Your first component](https://react.dev/learn/describing-the-ui#your-first-component)

React:

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

ivi:

```js
import { html } from 'ivi';

const Profile = () => html`
  <img
    src="https://i.imgur.com/MK3eW3As.jpg"
    alt="Katherine Johnson"
  />
`;

const Gallery = () => html`
  <section>
    <h1>Amazing scientists</h1>
    ${Profile()}
    ${Profile()}
    ${Profile()}
  </section>
`;
export default Gallery;
```

### [Importing and exporting components](https://react.dev/learn/describing-the-ui#importing-and-exporting-components)

React:

```js
import Profile from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

ivi:

```js
import { html } from 'ivi';
import Profile from './Profile.js';

const Gallery = () => html`
  section
    h1 'Amazing scientists'
    ${Profile()}
    ${Profile()}
    ${Profile()}
`;

export default Gallery;
```

### [Writing markup with JSX](https://react.dev/learn/describing-the-ui#writing-markup-with-jsx)

React:

```js
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve spectrum technology</li>
      </ul>
    </>
  );
}
```

ivi:

```js
import { html } from 'ivi';

const TodoList = () => html`
  <h1>Hedy Lamarr's Todos</h1>
  <img
    class"photo"
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
  />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve spectrum technology</li>
  </ul>
`;
export default TodoList;
```
### [JavaScript in JSX with curly braces](https://react.dev/learn/describing-the-ui#javascript-in-jsx-with-curly-braces)

React:

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

ivi:

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

const TodoList = () => html`
  <div
    ~background-color=${person.theme.backgroundColor}
    ~color=${person.theme.color}
  >
    <h1>${person.name}'s Todos</h1>
    <img
      class="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
    <ul>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  </div>
`;
export default TodoList;
```

### [Passing props to a component](https://react.dev/learn/describing-the-ui#passing-props-to-a-component)

React:

```jsx
import { getImageUrl } from './utils.js'

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```

ivi:

```js
import { getImageUrl } from './utils.js'

const Profile = () => (
  Card(
    Avatar({
      size: 100,
      person: {
        name: 'Katsuko Saruhashi',
        imageId: 'YfeOqp2'
      },
    }),
  )
);
export default Profile;
```

### [Conditional Rendering](https://react.dev/learn/describing-the-ui#conditional-rendering)

React:

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

ivi:

```js
import { html } from "ivi";

const Item = ({ name, isPacked }) => html`
  <li class="item">
    ${name} ${isPacked && '✔'}
  </li>
`;

const PackingList = () => html`
  <section>
    <h1>Sally Ride's Packing List</h1>
    <ul>
      ${Item({ isPacked: true, name: 'Space suit' })}
      ${Item({ isPacked: true, name: 'Helmet with a golden leaf' })}
      ${Item({ isPacked: false, name: 'Photo of Tam' })}
    </ul>
  </section>
`;
export default PackingList;
```

### [Rendering lists](https://react.dev/learn/describing-the-ui#rendering-lists)

React:

```js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
```

ivi:

```js
import { List } from 'ivi';
import { html } from 'ivi';
import { people } from './data.js';
import { getImageUrl } from './utils.js';

const ScientistsList = () => html`
  <article>
    <h1>Scientists</h1>
    <ul>
      ${List(people, (person) => person.id, (person) => html`
        <li>
          <img
            src=${getImageUrl(person)}
            alt=${person.name}
          />
          <p>
            <b>${person.name}:</b>
            \v ${person.profession}
            \v known for  ${person.accomplishment}
          </p>
        </li>
      `)}
    </ul>
  </article>
`;
export default ScientistsList;
```

### [Keeping components pure](https://react.dev/learn/describing-the-ui#keeping-components-pure)

React:

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

ivi:

```js
import { html } from 'ivi';

const Cup = ({ guest }) => html`
  <h2>Tea cup for guest #${guest}</h2>
`;

const TeaSet = () => [
  Cup({ guest: 1 }),
  Cup({ guest: 2 }),
  Cup({ guest: 3 }),
];
export default TeaSet;
```

## [Adding Interactivity](https://react.dev/learn/adding-interactivity)

### [Responding to events](https://react.dev/learn/adding-interactivity#responding-to-events)

React:

```js
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Playing!')}
      onUploadImage={() => alert('Uploading!')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

ivi:

```js
import { component, useState } from 'ivi';
import { html } from 'ivi';

const App = component((c) => {
  const onPlayMovie = () => alert('Playing!');
  const onUploadImage = () => alert('Uploading!');
  return () => ToolBar({ onPlayMovie, onUploadImage });
});
export default App;

const Toolbar = ({ onPlayMovie, onUploadImage }) => html`
  <div>
    ${Button({ onClick: onPlayMovie, children: 'Play Movie' })}
    ${Button({ onClick: onUploadImage, children: 'Upload Image' })}
  </div>
`;

const Button = ({ onClick, children }) => html`
  <button @click=${onClick}>
    ${children}
  </button>
`;
```

### [State: a component’s memory](https://react.dev/learn/adding-interactivity#state-a-components-memory)

React:

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
    </>
  );
}
```

ivi:

```js
import { component, useState } from 'ivi';
import { html } from 'ivi';
import { sculptureList } from './data.js';

const Gallery = () => {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  return () => {
    const index = index();
    const showMore = showMore();
    const sculpture = sculptureList[index];
    return html`
      <button @click=${handleNextClick}>Next</button>
      <h2>
        <i>${sculpture.name}</i>
        \v by ${sculpture.artist}
      </h2>
      <h3>(${index + 1} of ${sculptureList.length}</h3>
      <button @click=${handleMoreClick}>
        ${showMore ? 'Hide' : 'Show'} details
      </button>
      ${showMore && html`<p>${sculpture.description}</p>`}
      <img
        src=${sculpture.url}
        alt=${sculpture.alt}
      />
    `;
  };
}
export default Gallery;
```

### [State as a snapshot](https://react.dev/learn/adding-interactivity#state-as-a-snapshot)

React:

```js
console.log(count);  // 0
setCount(count + 1); // Request a re-render with 1
console.log(count);  // Still 0!
```

ivi:

Like regular javascript variables, ivi state is updated immediately.

```js
console.log(count());  // 0
setCount(count() + 1); // Request a re-render with 1
console.log(count());  // 1
```

### [Updating objects in state](https://react.dev/learn/adding-interactivity#updating-objects-in-state)

React:

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img
        src={person.artwork.image}
        alt={person.artwork.title}
      />
    </>
  );
}
```

ivi:

```js
import { component, useState } from 'ivi';
import { html } from 'ivi';

const Form = component((c) => {
  const [person, setPerson] = useState(c, {
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person(),
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    const p = person();
    setPerson({
      ...p,
      artwork: {
        ...p.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    const p = person();
    setPerson({
      ...p,
      artwork: {
        ...p.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    const p = person();
    setPerson({
      ...p,
      artwork: {
        ...p.artwork,
        image: e.target.value
      }
    });
  }

  return () => {
    const p = person();
    return html`
      <label>
        Name:
        <input
          *value=${p.name}
          @input=${handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          *value=${p.artwork.title}
          @input=${handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          *value=${p.artwork.city}
          @input=${handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          *value=${p.artwork.image}
          @input=${handleImageChange}
        />
      </label>
      <p>
        <i>${p.artwork.title}</i>
        \v by ${p.name}
        <br>
        (located in ${p.artwork.city} )
      </p>
      <img
        src=${p.artwork.image}
        alt=${p.artwork.title}
      />
    `;
  };
});
export default Form;
```

## [Managing State](https://react.dev/learn/managing-state)

### [Reacting to input with state](https://react.dev/learn/managing-state#reacting-to-input-with-state)

React:

```js

import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

ivi:

```js
import { component, useState } from 'ivi';
import { html } from 'ivi';

const Form = component((c) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  async function handleSubmit(e) {
    e.preventDefault();
    const answer = answer();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return () => {
    if (status() === 'success') {
      return html`h1 'That's right!`;
    }
    return html`
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form @submit=${handleSubmit}>
        <textarea
          *value=${answer()}
          @input=${handleTextareaChange}
          disabled=${status() === 'submitting'}
        />
        <br>
        <button
          disabled=${
            answer().length === 0 ||
            status() === 'submitting'
          }
          Submit
        />
        ${error() && html`<p class="Error">${error().message}</p>`}
      </form>
    `;
  };
});

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

### [Choosing the state structure](https://react.dev/learn/managing-state#choosing-the-state-structure)

React:

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
```

ivi:

```js
import { component, useState } from 'ivi';
import { html } from 'ivi';

const Form = component((c) => {
  const [firstName, setFirstName] = useState(c, '');
  const [lastName, setLastName] = useState(c, '');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return () => {
    const fullName = firstName + ' ' + lastName;

    return html`
      <h2>Let's check you in</h2>
      <label>
        First Name: \v
        <input *value=${firstName()} @input=${handleFirstNameChange} />
      </label>
      <label>
        Last name: \v
        <input *value=${lastName()} @input=${handleLastNameChange} />
      <p>
        Your ticket will be issued to: \v
        <b>${fullName}</b>
      </p>
    `;
  };
});
```

### [Preserving and resetting state](https://react.dev/learn/managing-state#preserving-and-resetting-state)

React:

```js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.email} contact={to} />
    </div>
  )
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];
```

ivi:

```js
import { component, useState } from 'ivi';
import { html } from 'ivi';
import { Identity } from '@ivi/identity';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

const Messenger = component((c) => {
  const [_to, setTo] = useState(contacts[0]);
  const onSelect = (contact) => { setTo(contact); };
  return () => {
    const to = _to();
    return html`
      <div>
        ${ContactList({
            contacts,
            selectedContact: to,
            onSelect,
        })}
        ${Identity({ key: to.email, contact: to })}
      </div>
    `;
  }
});
export default Messenger;

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];
```

### [Extracting state logic into a reducer](https://react.dev/learn/managing-state#extracting-state-logic-into-a-reducer)

React:

```js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];
```

ivi:

```js
import { component, useReducer } from 'ivi';
import { html } from 'ivi';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

const TaskApp = component((c) => {
  const [tasks, dispatch] = useReducer(c, initialTasks, tasksReducer);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return () => html`
    <h1>Prague itinerary</h1>
    ${AddTask({ onAddTask })}
    ${TaskList({
      tasks,
      onChangeTask: handleChangeTask,
      onDeleteTask: handleDeleteTask,
    })}
  `;
});
export default TaskApp;

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];
```

### [Passing data deeply with context](https://react.dev/learn/managing-state#passing-data-deeply-with-context)

React:

```js
import { createContext, useContext } from 'react';
const LevelContext = createContext(0);

function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}

function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

ivi:

```js
import { component, context } from 'ivi';
import { html } from 'ivi';

const [getLevelContext, LevelContext] = context();

const Heading = (c) => {
  const level = getLevelContext(c);
  return (children) => {
    switch (level) {
      case 0:
        throw Error('Heading must be inside a Section!');
      case 1:
        return html`<h1>${children}</h1>`;
      case 2:
        return html`<h2>${children}</h2>`;
      case 3:
        return html`<h3>${children}</h3>`;
      case 4:
        return html`<h4>${children}</h4>`;
      case 5:
        return html`<h5>${children}</h5>`;
      case 6:
        return html`<h6>${children}</h6>`;
      default:
        throw Error('Unknown level: ' + level);
    }
  }
}

const Section = component(c) => {
  const level = useContext(LevelContext);
  return (children) => html`
    <section class="section">
      ${LevelContext(level + 1, children)}
    </section>
  `;
}

const Page = () => (
  Section([
    Heading("Title"),
    Section([
      Heading("Heading"),
      Heading("Heading"),
      Heading("Heading"),
    ]),
    Section([
      Heading("Sub-heading"),
      Heading("Sub-heading"),
      Heading("Sub-heading"),
      Section([
        Heading("Sub-sub-heading"),
        Heading("Sub-sub-heading"),
        Heading("Sub-sub-heading"),
      ]),
    ]),
  ])
);
```

## [Escape Hatches](https://react.dev/learn/escape-hatches)

### [Referencing values with refs](https://react.dev/learn/escape-hatches#referencing-values-with-refs)

React:

```js
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```

ivi:

```js
import { component } from 'ivi';
import { html } from 'ivi';

const Counter = component((c) => {
  let _ref = 0;

  function handleClick() {
    _ref += 1;
    alert('You clicked ' + _ref + ' times!');
  }

  return html`<button @click=${handleClick}>Click me!</button>`;
});
export default Counter;
```

### [Manipulating the DOM with refs](https://react.dev/learn/escape-hatches#manipulating-the-dom-with-refs)

React:

```js
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

ivi:

```js
import { component } from 'ivi';
import { html } from 'ivi';

const Form = component((c) => {
  let _inputRef = null;
  const onInputRef = (e) => _inputRef = e;

  function handleClick() {
    inputRef.current.focus();
  }

  return () => html`
    <input ${onInputRef}/>
    <button @click=${handleClick}>Focus the input</button>
  `;
});
```

### [Synchronizing with Effects](https://react.dev/learn/escape-hatches#synchronizing-with-effects)

React:

```js
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```

ivi:

```js
import { component, useEffect } from 'ivi';
import { html } from 'ivi';

const VideoPlayer = component((c) => {
  let _ref = null;
  const getRef = (e) => _ref = e;
  const update = useEffect(c, (isPlaying) => {
    if (isPlaying) {
      _ref.play();
    } else {
      _ref.pause();
    }
  }, strictEq);

  return ({ src, isPlaying }) => (
    update(isPlaying),
    html`<video ${getRef} src=${src} loop playsInline />`);
});

const App = component((c) => {
  const [isPlaying, setIsPlaying] = useState(c, false);
  return html`
    <button @click=${onClick}>${isPlaying() ? 'Pause' : 'Play'}</button>
    ${VideoPlayer({
      isPlaying: isPlaying(),
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    })}
  `;
});

export default App;
```

### [Removing Effect dependencies](https://react.dev/learn/escape-hatches#removing-effect-dependencies)

React:

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
```

ivi:

```js
import { component, useState, useEffect } from 'ivi';
import { html } from 'ivi';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

const ChatRoom = component((c) => {
  const [message, setMessage] = useState(c, '');

  const updateRoomConnection = useEffect(c, (roomId) => {
    const options = {
      serverUrl,
      roomId,
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, strictEq);

  const onInput = (ev) => { setMessage(ev.target.value); };

  return ({ roomId }) => (
    updateRoomConnection(roomId),
    html`
      <h1>Welcome to the ${roomId} room!</h1>
      <input *value=${message()} @input=${onInput} />
    `,
  );
});

const App = component((c) => {
  const [roomId, setRoomId] = useState('general');
  const onChange = (ev) => setRoomId(ev.target.value);
  return html`
    <label>
      Choose the chat room: \v
      <select
        *value=${roomId}
        @change=${onChange}
      >
        <option value="general">general</option>
        <option value="travel">travel</option>
        <option value="music">music</option>
      </select>
    <hr>
    ${ChatRoom({ roomId: roomId() })}
  `;
});
export default App;
```

### [Reusing logic with custom Hooks](https://react.dev/learn/escape-hatches#reusing-logic-with-custom-hooks)

React:

```jsx
import { useState, useEffect } from 'react';

function useDelayedValue(value, delay) {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    setTimeout(() => {
      setDelayedValue(value);
    }, delay);
  }, [value, delay]);

  return delayedValue;
}

function usePointerPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);
  return position;
}

export default function Canvas() {
  const pos1 = usePointerPosition();
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos3, 50);
  return (
    <>
      <Dot position={pos1} opacity={1} />
      <Dot position={pos2} opacity={0.8} />
      <Dot position={pos3} opacity={0.6} />
      <Dot position={pos4} opacity={0.4} />
      <Dot position={pos5} opacity={0.2} />
    </>
  );
}

function Dot({ position, opacity }) {
  const style = {
    position: 'absolute',
    backgroundColor: 'pink',
    borderRadius: '50%',
    opacity,
    transform: `translate(${position.x}px, ${position.y}px)`,
    pointerEvents: 'none',
    left: -20,
    top: -20,
    width: 40,
    height: 40,
  };

  return (
    <div style={style} />
  );
}
```

ivi:

```js
import {
  createRoot, update, component, useState, useEffect, shallowEqArray, html,
} from "ivi";

const ZERO: Point = { x: 0, y: 0 };

function useDelayedValue(c) {
  const [delayedValue, setDelayedValue] = useState(c, ZERO);

  return [
    delayedValue,
    useEffect(c, ([value, delay]) => {
      setTimeout(() => {
        setDelayedValue(value);
      }, delay);
    }, shallowEqArray)
  ];
}

function usePointerPosition(c) {
  const [position, setPosition] = useState(c, ZERO);
  useEffect(c, () => {
    const onMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  })();
  return position;
}

const Canvas = component((c) => {
  const _pos1 = usePointerPosition(c);
  const [_pos2, updatePos2] = useDelayedValue(c);
  const [_pos3, updatePos3] = useDelayedValue(c);
  const [_pos4, updatePos4] = useDelayedValue(c);
  const [_pos5, updatePos5] = useDelayedValue(c);
  return () => {
    const pos1 = _pos1();
    const pos2 = _pos2();
    const pos3 = _pos3();
    const pos4 = _pos4();
    const pos5 = _pos5();
    updatePos2([pos1, 100]);
    updatePos3([pos2, 200]);
    updatePos4([pos3, 100]);
    updatePos5([pos3, 50]);
    return [
      Dot({ position: pos1, opacity: 1 }),
      Dot({ position: pos2, opacity: 0.8 }),
      Dot({ position: pos3, opacity: 0.6 }),
      Dot({ position: pos4, opacity: 0.4 }),
      Dot({ position: pos5, opacity: 0.2 }),
    ];
  };
});

const Dot = ({ position, opacity }) => html`
  <div
    ~position="absolute"
    ~background-color="pink"
    ~border-radius="50%"
    ~pointer-events="none"
    ~left="-20px"
    ~top="-20px"
    ~width="40px"
    ~height="40px"
    ~opacity=${opacity}
    ~transform=${`translate(${position.x}px,${position.y}px)`}
  />
`;

update(
  createRoot(document.getElementById("app")!),
  Canvas(),
);
```
