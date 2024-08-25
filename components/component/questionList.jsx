import {
    DndContext,
    useDraggable,
    useDroppable,
    rectIntersection,
    DragOverlay,
  } from "@dnd-kit/core";
  import { useState, useMemo } from "react";
  import { Button } from "@/components/ui/button";
  import { GripVertical, Edit2, Trash2 } from "lucide-react";
  
  // Draggable and Droppable component combined
  const DraggableQuestion = ({
    question,
    index,
    editQuestion,
    removeQuestion,
    isOver,
    dragPosition,
  }) => {
    const { attributes, listeners, setNodeRef: setDraggableNodeRef } = useDraggable({
      id: question.id,
    });
  
    const { setNodeRef: setDroppableNodeRef } = useDroppable({
      id: question.id,
    });
  
    return (
      <div
        ref={(node) => {
          setDraggableNodeRef(node);
          setDroppableNodeRef(node);
        }}
        {...listeners}
        {...attributes}
        className={`p-4 mb-4 bg-muted rounded-lg relative ${
          isOver
            ? dragPosition === "above"
              ? "border-t-4 border-red-500"
              : "border-b-4 border-red-500"
            : ""
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="mr-2 cursor-move">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
            <div className="text-sm font-medium">No. {index + 1}</div>
            <h3 className="font-medium">{question.text}</h3>
            </div>
          </div>
          <div className="z-[999]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => editQuestion(question)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeQuestion(question.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Type: {question.type}</p>
        {question.type === "radio" && question.options && (
          <div className="mt-2">
            <p className="text-sm font-medium">Options:</p>
            <ul className="list-disc pl-5 text-sm">
              {question.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  // Main component
  const DraggableQuestions = ({
    questions,
    editQuestion,
    removeQuestion,
    activeId,
    overId,
    dragPosition,
  }) => {
    const memoizedQuestions = useMemo(() => questions, [questions]);
  
    return (
      <div className="droppable-container">
        {memoizedQuestions.map((question, index) => (
          <DraggableQuestion
            key={question.id}
            question={question}
            index={index}
            editQuestion={editQuestion}
            removeQuestion={removeQuestion}
            isOver={overId === question.id}
            dragPosition={dragPosition}
          />
        ))}
      </div>
    );
  };
  
  export default function DndKitExample({
    questions,
    setQuestions,
    editQuestion,
    removeQuestion,
  }) {
    const [activeId, setActiveId] = useState(null);
    const [overId, setOverId] = useState(null);
    const [dragPosition, setDragPosition] = useState(null);
  
    return (
      <DndContext
        collisionDetection={rectIntersection} // Updated collision detection strategy
        onDragStart={(event) => {
          setActiveId(event.active.id);
          console.log(`Drag started: ${event.active.id}`);
        }}
        onDragOver={(event) => {
          const { over, active } = event;
          setOverId(over ? over.id : null);
  
          console.log(`Dragging over: ${over ? over.id : 'None'}`);
          console.log(`Dragged element: ${active.id}`);
  
          if (over && active) {
            const overIndex = questions.findIndex((q) => q.id === over.id);
            const activeIndex = questions.findIndex((q) => q.id === active.id);
  
            console.log(`Active index: ${activeIndex}, Over index: ${overIndex}`);
  
            if (activeIndex < overIndex) {
              setDragPosition("below");
            } else if (activeIndex > overIndex) {
              setDragPosition("above");
            } else {
              setDragPosition(null);
            }
          }
        }}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over && active.id !== over.id) {
            const oldIndex = questions.findIndex((q) => q.id === active.id);
            const newIndex = questions.findIndex((q) => q.id === over.id);
            const updatedQuestions = [...questions];
            const [moved] = updatedQuestions.splice(oldIndex, 1);
  
            // Adjust newIndex if dragging to the top
            updatedQuestions.splice(newIndex, 0, moved);
            setQuestions(updatedQuestions);
  
            console.log(`Moved from index ${oldIndex} to index ${newIndex}`);
          }
          setActiveId(null);
          setOverId(null);
          setDragPosition(null);
          console.log('Drag ended');
        }}
        onDragCancel={() => {
          setActiveId(null);
          setOverId(null);
          setDragPosition(null);
          console.log('Drag cancelled');
        }}
      >
        <DraggableQuestions
          questions={questions}
          setQuestions={setQuestions}
          editQuestion={editQuestion}
          removeQuestion={removeQuestion}
          activeId={activeId}
          overId={overId}
          dragPosition={dragPosition}
        />
  
        <DragOverlay>
          {activeId ? (
            <div className="p-4 mb-4 bg-muted rounded-lg shadow-md">
              {questions.find((q) => q.id === activeId)?.text}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  }
  