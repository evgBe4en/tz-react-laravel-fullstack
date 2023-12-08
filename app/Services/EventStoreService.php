<?php

namespace App\Services;

use App\Models\Event;
use App\Models\Type;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class EventStoreService
{
    public function store($data)
    {
        try {
            DB::beginTransaction();

            $type = $data['type'];
            $typeId = $this->getTypeId($type);

            $eventData = Arr::except($data, 'type');

            $event = Event::create($eventData);

            $event->types()->attach($typeId);

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            return $exception->getMessage();
        }
        return $event;
    }

    private function getTypeId($type)
    {
        $existingType = Type::where('title', $type)->first();
        if ($existingType) {
            return $existingType->id;
        }

        return Type::create($type);

    }

    public function update(Event $event, mixed $data)
    {
        try {
            DB::beginTransaction();

            $typeName = $data['type'];

            unset($data['type']);

            $type = Type::firstOrCreate(['title' => $typeName]);

            $typeId = $type->id;

            $event->update($data);

            if (Type::find($typeId)) {
                $event->types()->sync([$typeId]);
            }

            DB::commit();

        } catch (\Exception $e) {

            DB::rollBack();
            return $e->getMessage();

        }

        return $event->fresh();
    }


}


