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

you
i
be
your
this
have
if
or
they
at
on
`
    .split('\n')
    .map(s => s.trim())
    .filter(s => s),
}
