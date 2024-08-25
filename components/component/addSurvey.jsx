import React, { useState, useMemo  } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Trash2, X, Edit2, CalendarIcon, GripVertical } from "lucide-react";
import { format } from "date-fns";
import DndKitExample from './questionList';


export default function AddSurvey() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionType, setNewQuestionType] = useState('radio');
  const [newQuestionOptions, setNewQuestionOptions] = useState(['']);
  const [isActive, setIsActive] = useState(false);
  const [expirationDate, setExpirationDate] = useState(undefined);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

    console.log(questions)
  const addOrUpdateQuestion = () => {
    if (newQuestionText.trim() !== '') {
      const newQuestion = {
        id: editingQuestionId || Date.now(),
        text: newQuestionText,
        type: newQuestionType,
        options: newQuestionType === 'radio' ? newQuestionOptions.filter(option => option.trim() !== '') : undefined
      };

      if (editingQuestionId) {
        setQuestions(questions.map(q => q.id === editingQuestionId ? newQuestion : q));
      } else {
        setQuestions([...questions, newQuestion]);
      }

      resetForm();
    }
  };

  const resetForm = () => {
    setNewQuestionText('');
    setNewQuestionType('radio');
    setNewQuestionOptions(['']);
    setEditingQuestionId(null);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
    if (editingQuestionId === id) {
      resetForm();
    }
  };

  const editQuestion = (question) => {
    setEditingQuestionId(question.id);
    setNewQuestionText(question.text);
    setNewQuestionType(question.type);
    setNewQuestionOptions(question.options || ['']);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestionOptions];
    updatedOptions[index] = value;
    setNewQuestionOptions(updatedOptions);
  };

  const addOption = () => {
    setNewQuestionOptions([...newQuestionOptions, '']);
  };

  const removeOption = (index) => {
    const updatedOptions = newQuestionOptions.filter((_, i) => i !== index);
    setNewQuestionOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, questions, isActive, expirationDate });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Create New Survey</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Survey Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Survey Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter survey title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Survey Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter survey description"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
                <Label htmlFor="active">Set survey as active</Label>
              </div>
              <div className="w-full sm:w-auto">
                <Label htmlFor="expiration" className="mb-2 block">Expiration Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="expiration"
                      variant={"outline"}
                      className={`w-full sm:w-[240px] justify-start text-left font-normal ${!expirationDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expirationDate ? format(expirationDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={expirationDate} onSelect={setExpirationDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Survey Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="questions" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="questions">Questions List</TabsTrigger>
                <TabsTrigger value="add">{editingQuestionId ? 'Edit Question' : 'Add Question'}</TabsTrigger>
              </TabsList>
              <TabsContent value="questions">
                <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                  <DndKitExample questions={questions} editQuestion={editQuestion} removeQuestion={removeQuestion} setQuestions={setQuestions} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="add">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newQuestion">Question Text</Label>
                    <Input
                      id="newQuestion"
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder="Enter question text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="questionType">Question Type</Label>
                    <Select value={newQuestionType} onValueChange={(value) => setNewQuestionType(value)}>
                      <SelectTrigger id="questionType">
                        <SelectValue placeholder="Select question type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="radio">Radio Select</SelectItem>
                        <SelectItem value="text">Text Input</SelectItem>
                        <SelectItem value="number">Number Input</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newQuestionType === 'radio' && (
                    <div className="space-y-2">
                      <Label>Options</Label>
                      {newQuestionOptions.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                          />
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeOption(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={addOption}>
                        Add Option
                      </Button>
                    </div>
                  )}
                  <Button type="button" onClick={addOrUpdateQuestion} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> {editingQuestionId ? 'Update Question' : 'Add Question'}
                  </Button>
                  {editingQuestionId && (
                    <Button type="button" onClick={resetForm} variant="outline" className="w-full">
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">Create Survey</Button>
      </form>
    </div>
  );
}
