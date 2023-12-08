<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexRequest;
use App\Http\Requests\StoreRequest;
use App\Http\Requests\UpdateRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use App\Services\EventStoreService;

class EventController extends Controller
{

    public $service;

    public function __construct(EventStoreService $service)
    {
        $this->service = $service;
    }

    public function index(IndexRequest $request)
    {
        $query = Event::query();

        if ($request->has('type')) {
            $types = $request->input('type');
            $query->whereHas('types', function ($query) use ($types) {
                $query->whereIn('title', $types);
            });
        }

        $events = $query->get();

        return EventResource::collection($events);
    }

    public function store(StoreRequest $request)
    {

        $data = $request->validated();

        $event = $this->service->store($data);

        return $event instanceof Event ? new EventResource($event) : $event;
    }

    public function update(UpdateRequest $request, Event $event)
    {
        $data = $request->validated();

        $event = $this->service->update($event, $data);

        return $event instanceof Event ? new EventResource($event) : $event;

    }

    public function delete($event)
    {
        $event = Event::find($event);

        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }

}
