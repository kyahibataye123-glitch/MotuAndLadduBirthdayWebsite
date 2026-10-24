# For My Motu, From Her Laddu

## Preview

The Figma Make preview updates automatically. For a production check, run:

```bash
pnpm run build
```

## Personalize

Edit the clearly labeled constants at the top of `src/App.tsx`:

- `BIRTHDAY_AT`: birthday date/time in ISO format.
- `SECRET_PASSWORD`: playful Secret Room password.
- `QUIZ_ANSWER_KEY`: nine zero-based option indexes; scoring stays hidden until all are configured.
- `SONGS`: the two uploaded audio files are connected in upload order through browser-compatible `.m4a` paths.

The nine available personal photos are in `public/memories/`. Replace them in place or update the `memories` list in `src/App.tsx`; keep the reference collage out of this folder.
