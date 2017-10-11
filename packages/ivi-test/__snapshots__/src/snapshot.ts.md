# `src/snapshot.ts`

#### `'abc'`

    abc

#### `<div>`

    <div/>

#### `<span>`

    <span/>

#### `<div> (null props)`

    <div/>

#### `<div> ({} props)`

    <div/>

#### `<div tabIndex='1'>`

    <div
      tabIndex="1"
    />

#### `<div tabIndex='1' title='2'>`

    <div
      tabIndex="1"
      title="2"
    />

#### `<div data-abc='a'`

    <div
      data-abc="a"
    />

#### `<div aria-type='button'`

    <div
      aria-type="button"
    />

#### `<div class=''>`

    <div
      class=""
    />

#### `<div class='a'>`

    <div
      class="a"
    />

#### `<div class='a b'>`

    <div
      class="a b"
    />

#### `<div style=null>`

    <div/>

#### `<div style={top: 10px}>`

    <div
      style={
        top: 10px;
      }
    />

#### `<div style={float: 'left'}>`

    <div
      style={
        float: left;
      }
    />

#### `<div style={top: 10px; left: 20px}>`

    <div
      style={
        top: 10px;
        left: 20px;
      }
    />

#### `<div></div> (null children)`

    <div/>

#### `<div>'abc'</div>`

    <div>
      abc
    </div>

#### `<div>10</div>`

    <div>
      10
    </div>

#### `<div><span></div>`

    <div>
      <span/>
    </div>

#### `<div>[]</div>`

    <div/>

#### `<div>[<span>]</div>`

    <div>
      <span/>
    </div>

#### `<div>[<span>, <strong>]</div>`

    <div>
      <span/>
      <strong/>
    </div>

#### `<div>[  <div>'hello'</div>,  <div>[<span>'world'</span>, <div><span></div>]</div>,  <div><div></div>,  <div>]</div>`

    <div>
      <div>
        hello
      </div>
      <div>
        <span>
          world
        </span>
        <div>
          <span/>
        </div>
      </div>
      <div>
        <div/>
      </div>
      <div/>
    </div>

## `svg`

####   `<circle>`

    <circle/>

####   `<circle class='a'>`

    <circle
      class="a"
    />

####   `<circle style={top: 10px}>`

    <circle
      style={
        top: 10px;
      }
    />

####   `<circle xlink:href='a'>`

    <circle
      xlink:href="a"
    />

####   `<circle xml:text='a'>`

    <circle
      xml:test="a"
    />

## `special elements`

####   `<input>`

    <input/>

####   `<input value='abc'>`

    <input
      value="abc"
    />

####   `<input type='checkbox'>`

    <input
      type="checkbox"
    />

####   `<input type='checkbox' checked='true'>`

    <input
      type="checkbox"
      checked="true"
    />

####   `<textarea>`

    <textarea/>

####   `<textarea>abc</textarea>`

    <textarea>
      abc
    </textarea>

####   `<audio>`

    <audio/>

####   `<audio volume=0.5>`

    <audio
      volume="0.5"
    />

####   `<video volume=0.5>`

    <video
      volume="0.5"
    />

