import React, { Component } from 'react';
import { isElementOfType } from 'react-dom/test-utils';
import './app.css';
import Habits from './components/habits';
import Navbar from './components/navbar';

class App extends Component {
	state = {
		habits: [
			{ name: 'Reading', count: 0, id: 'habit_1' },
			{ name: 'Running', count: 0, id: 'habit_2' },
			{ name: 'Coding', count: 0, id: 'habit_3' },
		],
		events: {
			/**
			 * 카운트 증가
			 * @param {*} habit
			 */
			handleIncrement: (habit) => {
				/*
        // state 오브젝트를 직접적으로 수정하는건 좋지않다 !!!
				habit.count++;
        */
				/*
				const habits = [...this.state.habits]; // 새로운 배열에 복사
				const index = habits.indexOf(habit);
				habits[index].count++;
				// key와 value 이름이 똑같으면 하나로 생략가능
				//this.setState({ habits: habits });
				this.setState({ habits });
				*/
				// 2021-06-04 PureComponent와 Shallow Comparison으로 인한 오류 해결 코드
				const habits = this.state.habits.map((item) => {
					if (item.id === habit.id) {
						return { ...item, count: item.count + 1 }; //deconstructing objectg
					}
					return item;
				});
				this.setState({ habits });
			},
			/**
			 * 카운트 감소
			 * @param {*} habit
			 */
			handleDecrement: (habit) => {
				/*
				const habits = [...this.state.habits];
				const index = habits.indexOf(habit);
				const count = habits[index].count - 1;
				habits[index].count = count < 0 ? 0 : count;
				this.setState({ habits: habits });
				*/
				// 2021-06-04 PureComponent와 Shallow Comparison으로 인한 오류 해결 코드
				const habits = this.state.habits.map((item) => {
					if (item.id === habit.id) {
						const count = habit.count - 1;
						return { ...habit, count: count < 0 ? 0 : count };
					}
					return item;
				});
				this.setState({ habits });
			},
			/**
			 * habit 삭제
			 * @param {*} habit
			 */
			handleDelete: (habit) => {
				const habits = this.state.habits.filter((item) => item.id !== habit.id);
				this.setState({ habits: habits });
			},
			/**
			 * habit 추가
			 * @param {*} name
			 */
			handleAdd: (name) => {
				//const habits = [...this.state.habits, {id : Date.now(), name: name, count: 0}]; // Separate operator
				const habits = [
					...this.state.habits,
					{ id: Date.now(), name, count: 0 },
				]; // 동일한 name 생략가능
				this.setState({ habits });
			},
			/**
			 * 카운트 리셋
			 */
			handleReset: () => {
				/*
				const habits = this.state.habits.map((habit) => {
					habit.count = 0;
					return habit;
				});
				this.setState({ habits });
				*/
				// 2021-06-04 PureComponent와 Shallow Comparison으로 인한 오류 해결 코드
				const habits = this.state.habits.map((item) => {
					if (item.count !== 0) {
						return { ...item, count: 0 };
					}
					return item;
				});
				this.setState({ habits });
			},
			handleClearAll: () => {
				const habits = this.state.habits.filter((item) => false);
				this.setState({ habits: habits });
			},
		},
	};

	render() {
		return (
			<>
				<Navbar
					totalCount={this.state.habits.filter((item) => item.count > 0).length}
				/>
				<Habits habits={this.state.habits} events={this.state.events} />
			</>
		);
	}
}

export default App;
