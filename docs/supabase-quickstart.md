# Supabase quickstart prompt (as provided by Supabase)

Saved for reference. The publishable key is replaced with a placeholder; the real value lives in the gitignored `.env.local` (see `.env.example`).

## 1. Install package

```
npm install @supabase/supabase-js
```

## 2. Add files

**.env.local**
```
EXPO_PUBLIC_SUPABASE_URL=https://hhldwqtjhucvpuqgczpk.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=sb_publishable_<your-publishable-key>
```

**utils/supabase.ts**
```ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
```

**App.tsx** (todo-list demo that reads from a `todos` table)
```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { supabase } from '../utils/supabase';

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data: todos, error } = await supabase.from('todos').select();

        if (error) {
          console.error('Error fetching todos:', error.message);
          return;
        }

        if (todos && todos.length > 0) {
          setTodos(todos);
        }
      } catch (error) {
        console.error('Error fetching todos:', error.message);
      }
    };

    getTodos();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Todo List</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text key={item.id}>{item.name}</Text>}
      />
    </View>
  );
};
```

## 3. Install Agent Skills (optional)

Agent Skills give AI coding tools ready-made instructions, scripts, and resources for working with Supabase more accurately and efficiently.

```
npx skills add supabase/agent-skills
```

---

## What we did differently

- Client lives at `src/lib/supabase.ts` (repo uses `src/`, not `utils/`), plus an `AppState` listener that starts/stops token auto-refresh with foreground/background.
- Installed with `npx expo install` so `@react-native-async-storage/async-storage` matches SDK 58. AsyncStorage is native, so a dev build (`npm run ios` / `android`) is required.
- The todo `App.tsx` demo was not used. Auth is implemented with `signInWithPassword` / `signUp` in `src/features/auth/SessionProvider.tsx`, with routes `src/app/sign-in.tsx` and `src/app/sign-up.tsx` guarded via `Stack.Protected` in `src/app/_layout.tsx`.
- Optional Agent Skills step was skipped.
