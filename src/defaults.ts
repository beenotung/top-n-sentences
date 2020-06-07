export let defaults = {
  skipWords: `
a
an
the

is
are
was
were

will
would
could

of
to
and
in
that
it
his
their
for
by
from
had
with
as
`
    .split('\n')
    .map(s => s.trim())
    .filter(s => s),
}
