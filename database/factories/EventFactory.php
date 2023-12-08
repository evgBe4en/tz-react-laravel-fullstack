<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{

    protected $model = Event::class;

    protected $dates = [
        '22-12-2023',
        '1-3-2023',
        '26-1-2024',
        '17-2-2024',
        '6-3-2024',
        '10-3-2024',
        '9-1-2024',
        '13-1-2024',

    ];

    protected $times = [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'description' => $this->faker->paragraph(2),
            'date' => $this->faker->randomElement($this->dates),
            'location' => $this->faker->city(),
            'time' => $this->faker->randomElement($this->times),
        ];
    }
}
