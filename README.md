# LayoutOutlet

> Describe your layout and zoning separately from routing and herarchical structure

## Usage

The bread & butter of ngx-layout-outlet are the two directives `lo-display` and `lo-outlet`.

 - `<lo-outlet name="foo"></lo-outlet>` Indicate a place in HTML markup that you reserve for content labeled "foo"
 - `<lo-display name="foo"> Some Content </lo-displat>` Labels the content `Some Content` with "foo"

 An outlet listens for content for its name and displays it. The content can be dynamic.

For example, this template

```html
<div class="column-left">
  <lo-outlet name="left"></lo-outlet>
</div>
<div class="column-right">
  <lo-outlet name="right"></lo-outlet>
</div>

<lo-display name="left">I am left!</lo-display>
<lo-display name="right">I am right!</lo-display>
```

results in the following output

```html
<div class="column-left">
  <lo-outlet name="left"></lo-outlet>
  I am left!
</div>
<div class="column-right">
  <lo-outlet name="right"></lo-outlet>
  I am right!
</div>

<lo-display name="left"></lo-display>
<lo-display name="right"></lo-display>
```

You can think of it as if the content is teleported into the outlet.

Here are some rules :

  + The `name` of an outlet is global to your application.
  + The `name` can be any string
  + `lo-outlet`s and `lo-display`s needn't be from the same content or hierarchy
  + Content from an `lo-display` with no corresponding `lo-outlet` is not displayed, nor rendered
  + `name` can be dynamic. you then have to bind it with `[name]="variable"`
  + when no `name` is found, `id` is used instead if it is specified

If there are several contents available for a given outlet, the default behaviour is to render
them all in order in which their parent component was rendered. This can be useful when combined
with routing.

```html
<!-- breadcrumb.component.html -->
<div class="breadcrumb">
  <lo-outlet name="breadcrumb"></lo-outlet>
</div>

<!-- app.component.html -->
<lo-display name="breadcrumb"> Home </lo-display>

<!-- deeper.component.html -->
<lo-display name="breadcrumb"> Deep </lo-display>
```

If you need to only display at most one content for an outlet, juste `<lo-outlet name="foo" [exclusive]="true"></lo-outlet>`.
This will only display the latest content.

## `*loZone`

You can use the structural directive `*loZone` if you need wrapping markup to rendered
only when there is content to display.

```html
<section>
  <aside *loZone name="sidebar">
    Here is some related information: <lo-outlet></lo-outlet>
  </aside>

  <main>
    This is the the primary content
    <lo-display name="sidebar">
      I am rendered in the sidebar
    </lo-display>
  </main>
</section>
```

Will only add an `<aside>` element into the dom if there is content to be display in the outlet `"sidebar"`.

Note that inside a `*loZone` the `name` attribute of a `lo-outlet` is optional.


## `*loInstead`

Similarly, you can use the structural directive `*loInstead` to display markup only when no content
is available for a given outlet.

```html
<section>
  <section *loZone name="notifications">
    <lo-outlet></lo-outlet>
  </section>
  <section *loInstead name="notifications" class="empty">
    No notifications to display
  </section>
</section>
```

## Development server

Run once `npm link --prefix projets/NgxLayoutOutlet`
Run once `npm link`

Run `ng build NgxLayoutOutlet --watch` and `ng serve` concurrently
