# Smart Task Manager (React Native + TypeScript)

A production-ready Smart Task Manager app built with:
- React Native (latest stable scaffolded by RN CLI)
- TypeScript
- React Navigation
- Zustand + AsyncStorage persistence
- Reanimated transitions

## Features

- Add, edit, delete tasks
- Task priorities: low, medium, high
- Mark tasks completed/pending
- Search by title or description
- Filter by all/completed/pending
- Dark mode toggle (persisted)
- Smooth animated task item transitions

## Project Structure

```text
src/
	components/
		EmptyState.tsx
		FilterTabs.tsx
		PriorityBadge.tsx
		TaskEditorModal.tsx
		TaskItem.tsx
		TaskSearchBar.tsx
	hooks/
		useFilteredTasks.ts
	navigation/
		AppNavigator.tsx
	screens/
		TaskListScreen.tsx
	store/
		useTaskStore.ts
	theme/
		palette.ts
		spacing.ts
	types/
		navigation.ts
		task.ts
	utils/
		task.ts
App.tsx
index.js
```

## Run

1. Install dependencies:

```bash
npm install
```

2. Start Metro:

```bash
npm run start
```

3. Run Android:

```bash
npm run android
```

4. Run iOS (macOS only):

```bash
npm run ios
```

## Quality Commands

```bash
npm run lint
npm run typecheck
npm test
```

## Notes

- Task data and dark mode preference are persisted in AsyncStorage.
- UI is componentized and optimized with memoization and stable callbacks.
