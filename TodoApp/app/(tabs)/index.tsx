import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [todos, setTodos] = useState([
    {
      id: "1",
      text: "Learn React Native",
      completed: true,
    },
    {
      id: "2",
      text: "Build Todo App",
      completed: true,
    },
    {
      id: "3",
      text: "Practice AWS",
      completed: false,
    },
   
    {
      id: "5",
      text: "Learn Redux Toolkit",
      completed: false,
    },
    {
      id:"6",
      text : "Spend time with friends",
      completed : true,
    }
  ]);

  // Add Todo
  const addTodo = () => {
    if (task.trim() === "") return;

    const newTodo = {
      id: Date.now().toString(),
      text: task,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTask("");
  };

  // Toggle Complete
  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
  };

  // Filter Logic
  const filteredTodos = todos.filter((todo) => {
    if (selectedFilter === "completed") {
      return todo.completed;
    }

    if (selectedFilter === "pending") {
      return !todo.completed;
    }

    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>

      {/* Input */}
      <TextInput
        placeholder="Enter Todo"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "all" && styles.activeButton,
          ]}
          onPress={() => setSelectedFilter("all")}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "completed" && styles.activeButton,
          ]}
          onPress={() => setSelectedFilter("completed")}
        >
          <Text style={styles.buttonText}>Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "pending" && styles.activeButton,
          ]}
          onPress={() => setSelectedFilter("pending")}
        >
          <Text style={styles.buttonText}>Pending</Text>
        </TouchableOpacity>
      </View>

      {/* Todo List */}
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.todoCard}
            onPress={() => toggleTodo(item.id)}
          >
            <Text style={styles.todoText}>{item.text}</Text>

            <Text style={styles.status}>{item.completed ? "✅" : "❌"}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  addButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  filterButton: {
    backgroundColor: "#666",
    padding: 10,
    borderRadius: 10,
  },

  activeButton: {
    backgroundColor: "black",
  },

  todoCard: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  todoText: {
    fontSize: 18,
  },

  status: {
    fontSize: 22,
  },
});
